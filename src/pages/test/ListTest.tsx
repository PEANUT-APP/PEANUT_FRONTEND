import React from 'react';
import CommunityList from '../../components/list/CommunityList';
import MyList from '../../components/list/MyList';
import {FoodImageList} from '../../components/list/FoodImageList';

const communityData = [
  {
    profileImageUrl: '',
    nickname: '닉네임1',
    text: '안녕하세요, 여기는 첫 번째 글입니다.',
    likes: 123,
    comments: 10,
  },
  {
    profileImageUrl: '',
    nickname: '닉네임2',
    text: '두 번째 글도 재미있어요!',
    likes: 456,
    comments: 20,
  },
  {
    profileImageUrl: '',
    nickname: '닉네임3',
    text: '세 번째 글입니다. 모두 좋은 하루 되세요!',
    likes: 789,
    comments: 30,
  },
  {
    profileImageUrl: '',
    nickname: '닉네임4',
    text: '마지막 네 번째 글입니다. 안녕!',
    likes: 99999,
    comments: 40,
  },
];

export default function ListTest() {
  return (
    <>
      {communityData.map((data, index) => (
        <CommunityList
          key={index}
          nickname={data.nickname}
          text={data.text}
          likes={data.likes}
          comments={data.comments}
        />
      ))}
      <MyList text="공지사항" />
      <FoodImageList type="음식명" value="양상추 샐러드" />
      <FoodImageList type="당 지수" value="8" />
      <FoodImageList type="칼로리" value="105 kcal" />
    </>
  );
}
