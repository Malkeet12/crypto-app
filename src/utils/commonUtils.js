import { socket } from './webSocket';

function toggleSubscription(key, element) {
  if (!element) return;

  const observer = new window.IntersectionObserver(
    ([entry]) => {
      let parameters = { topics: [key] };
      if (entry.isIntersecting) {
        //subscribe if element is in view else unsubscribe
        socket.emit('subscribe', parameters);
        return;
      }
      socket.emit('unsubscribe', parameters);
    },
    {
      root: null,
      threshold: 0.3, // set offset 0.3, it means trigger if at least 30% of element is in viewport
    }
  );

  observer.observe(element);
}

const CommonUtils = { toggleSubscription };
export default CommonUtils;
