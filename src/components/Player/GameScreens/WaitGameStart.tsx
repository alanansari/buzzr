import Game from '@/components/Game';

const WaitGameStart = () => {
  return (
    <>
      <h1 className="text-lg font-semibold mt-14 mb-4 p-2 bg-slate-200 rounded-md">Wait for the Host to Start the game...</h1>
      <div className='w-[55vw] h-[55vh] rounded-lg'>
        <Game />
      </div>
    </>
  )
}

export default WaitGameStart