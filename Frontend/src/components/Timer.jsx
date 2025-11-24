// import { useEffect, useState } from 'react';

// export default function Timer({ isActive }) {
//   const [seconds, setSeconds] = useState(0);

//   useEffect(() => {
//     let interval = null;

//     if (isActive) {
//       interval = setInterval(() => {
//         setSeconds(prev => prev + 1);
//       }, 1000);
//     } else if (!isActive && interval !== null) {
//       clearInterval(interval);
//     }

//     return () => clearInterval(interval);
//   }, [isActive]);

//   const formatTime = (sec) => {
//     const m = Math.floor(sec / 60);
//     const s = sec % 60;
//     return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
//   };

//   return (
//     <div className="bg-gray-100 text-gray-800 rounded-lg px-4 py-2 text-lg font-medium text-center shadow-md">
//       {formatTime(seconds)}
//     </div>
//   );
// }


import useTimer from '../hooks/useTimer';

export default function Timer({ isActive }) {
  const { formattedTime } = useTimer(isActive);

  return (
    <div className="bg-blue-50 text-blue-800 font-bold text-lg px-4 py-2 rounded-lg shadow-md w-max">
      ⏱ {formattedTime}
    </div>
  );
}

