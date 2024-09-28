import {useGetAllCommunityQuery} from '../../services/community/communityApi';

export function useCommunity() {
  const {data: allCommunityData, isSuccess: isAllCommunitySuccess} =
    useGetAllCommunityQuery();

  return {allCommunityData, isAllCommunitySuccess};
}
