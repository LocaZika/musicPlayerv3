import { forwardRef } from 'react';

function Audio(props, ref) {
  // const {volume} = props.data;
  const {setDuration} = props.context.dispatch;
  const {currentSong} = props.context.data;
  const audio = ref.current;
  console.log(audio); 
  // audio.setAttribute('src', currentSong.src);
  // audio.src = currentSong.src;
  // audio.play();
  return (
    <audio ref={ref}></audio>
  )
}
 
export default forwardRef(Audio);