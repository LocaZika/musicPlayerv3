import { forwardRef } from 'react';

function Audio(props, ref) {
  // const {volume} = props.data;
  const {setDuration} = props.context.dispatch;
  const audio = ref.current;
  const {src, duration} = props.onSetSrc();
  if(src !== '#'){
    audio.src = src;
    audio.play();
  }
  return (
    <audio ref={ref}></audio>
  )
}
 
export default forwardRef(Audio);