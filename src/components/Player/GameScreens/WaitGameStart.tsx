import Game from '@/components/Game';

const WaitGameStart = () => {
  return (
    <>
      <h1 className="text-lg font-semibold mt-6 mb-4 p-2 bg-slate-200 text-slate-900 rounded-md">Wait for the Host to Start the game...</h1>
      <div className='w-[60vw] h-[58vh] rounded-lg'>
        <Game />
      </div>
    </>
  )
}

export default WaitGameStart