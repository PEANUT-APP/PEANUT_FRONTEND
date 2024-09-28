import React from 'react';
import {
  MyCommunityContainer,
  MyCommunityContent,
  MyMoreTitle,
  MyMoreTop,
} from './styles';
import {FlatList, TouchableOpacity} from 'react-native';
import DesignIcon from '../../components/icon/DesignIcon';
import {colors} from '../../styles/colors';
import {useBackHandler} from '../../modules/commonHooks';
import {useMyCommunity} from './hooks';
import CommunityListItem from '../../components/list/community/CommunityListItem';
import {CommunityListItemType} from '../../components/list/community/types';

const communityData: CommunityListItemType[] = [
  {
    id: '1',
    title: '인슐린 주사를 까먹고 안 놨어요',
    date: '2024.09.04 오후 11:30',
    content: '아침에 인슐린 주사를 맞았어야 했는데 제가 급하게 학교를 가느라고',
    name: '울적한 땅콩',
    likes: '9,999+',
    comments: '9,999+',
  },
  {
    id: '2',
    title: '오늘 날씨가 너무 좋아요',
    date: '2024.09.05 오전 09:20',
    content: '날씨가 너무 맑고 상쾌해서 기분이 좋아졌어요.',
    name: '행복한 감자',
    likes: '150',
    comments: '23',
  },
  {
    id: '3',
    title: '인슐린 주사를 까먹고 안 놨어요',
    date: '2024.09.04 오후 11:30',
    content: '아침에 인슐린 주사를 맞았어야 했는데 제가 급하게 학교를 가느라고',
    name: '울적한 땅콩',
    likes: '9,999+',
    comments: '9,999+',
  },
  {
    id: '4',
    title: '인슐린 주사를 까먹고 안 놨어요',
    date: '2024.09.04 오후 11:30',
    content: '아침에 인슐린 주사를 맞았어야 했는데 제가 급하게 학교를 가느라고',
    name: '울적한 땅콩',
    likes: '9,999+',
    comments: '9,999+',
  },
  {
    id: '5',
    title: '인슐린 주사를 까먹고 안 놨어요',
    date: '2024.09.04 오후 11:30',
    content: '아침에 인슐린 주사를 맞았어야 했는데 제가 급하게 학교를 가느라고',
    name: '울적한 땅콩',
    likes: '9,999+',
    comments: '9,999+',
  },
  {
    id: '6',
    title: '인슐린 주사를 까먹고 안 놨어요',
    date: '2024.09.04 오후 11:30',
    content: '아침에 인슐린 주사를 맞았어야 했는데 제가 급하게 학교를 가느라고',
    name: '울적한 땅콩',
    likes: '9,999+',
    comments: '9,999+',
  },
];

export default function MyCommunity() {
  const {handleBack} = useBackHandler();
  const {title} = useMyCommunity();

  return (
    <MyCommunityContainer>
      <MyMoreTop>
        <TouchableOpacity activeOpacity={1} onPress={handleBack}>
          <DesignIcon type="back" size="l" color={colors.TextNeutral} />
        </TouchableOpacity>
        <MyMoreTitle weight="bold">{title}</MyMoreTitle>
      </MyMoreTop>
      <FlatList
        data={communityData}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <CommunityListItem
            id={item.id}
            title={item.title}
            date={item.date}
            content={item.content}
            name={item.name}
            likes={item.likes}
            comments={item.comments}
          />
        )}
        ItemSeparatorComponent={MyCommunityContent}
        showsVerticalScrollIndicator={false}
      />
    </MyCommunityContainer>
  );
}
