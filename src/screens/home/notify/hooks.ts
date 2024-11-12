import {formatDate} from '../../../modules/commonHooks';
import {useGetNotificationListQuery} from '../../../services/notification/notificationApi';

export default function useNotify() {
  const {data, isSuccess} = useGetNotificationListQuery();

  const formattedData =
    isSuccess && data
      ? data
          .map(notification => ({
            ...notification,
            create_At: formatDate(notification.create_At), // create_At 포맷팅
          }))
          .slice()
          .reverse()
      : [];

  return {data: formattedData, isSuccess};
}
