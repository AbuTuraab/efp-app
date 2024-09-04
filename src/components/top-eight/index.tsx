import type { Address } from 'viem'
import { FaRegEdit } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

import EditModal from './components/edit-modal'
import { useTopEight } from './hooks/use-top-eight'
import LoadingCell from '../loaders/loading-cell'
import TopEightProfile from './components/top-eight-profile'

interface TopEightProps {
  user: Address | string
  isConnectedUserProfile?: boolean
}

const TopEight: React.FC<TopEightProps> = ({ user, isConnectedUserProfile }) => {
  const { t } = useTranslation()
  const { editModalOpen, setEditModalOpen, topEight, topEightIsLoading } = useTopEight(user)

  return (
    <>
      {isConnectedUserProfile && editModalOpen && (
        <EditModal profiles={topEight || []} onClose={() => setEditModalOpen(false)} />
      )}
      <div className='glass-card relative xl:w-76 w-full 2xl:w-86 border-[3px] p-4 2xl:p-6 rounded-xl flex flex-col gap-4 xl:gap-6 border-[#FFDBD9] dark:border-[#a36d7d]'>
        {isConnectedUserProfile && (
          <div
            onClick={() => setEditModalOpen(true)}
            className='absolute top-2 right-2 font-semibold text-sm flex gap-1 items-center dark:text-zinc-300 dark:hover:text-zinc-200 text-zinc-600 cursor-pointer hover:text-zinc-500 hover:scale-110 transition-all'
          >
            <p>{t('edit')}</p>
            <FaRegEdit />
          </div>
        )}
        <div className='flex gap-2 font-bold justify-center items-center'>
          <h3 className='text-2xl'>{t('top eight title')}</h3>
        </div>
        {topEight?.length === 0 && !topEightIsLoading && (
          <p className='font-medium italic text-lg text-center text-zinc-500 dark:text-zinc-300'>
            {t('no top eight')}
          </p>
        )}
        <div className='flex flex-wrap justify-evenly items-center xl:gap-0 sm:gap-2'>
          {topEight?.slice(0, 8).map((profile, index) => (
            <TopEightProfile profile={profile} key={index} />
          ))}
          {new Array(topEightIsLoading ? 8 : 0).fill(0).map((_, index) => (
            <div key={index} className='flex flex-col w-28 2xl:w-36 py-4 items-center gap-2'>
              <LoadingCell className='h-[60px] w-[60px] rounded-full' />
              <LoadingCell className='h-7 w-24 rounded-lg' />
              <LoadingCell className='h-9 w-[109px] rounded-lg' />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default TopEight
