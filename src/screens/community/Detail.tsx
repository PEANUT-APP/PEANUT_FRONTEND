/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef} from 'react';
import {DetailContainer, DetailBox, DetailBack, DetailComments} from './styles';
import DesignIcon from '../../components/icon/DesignIcon';
import {colors} from '../../styles/colors';
import {useBackHandler} from '../../modules/commonHooks';
import CommentInput from './comment/CommentInput';
import {Animated, Keyboard} from 'react-native';
import CommunityCard from './card/CommunityCard';
import {useDetail} from './hooks';
import {ScrollView} from '../layout/styles';
import CommentInformation from './comment/CommentInformatin';
import CommentListItem from '../../components/list/comment/CommentListItem';

export default function Detail() {
  const {handleBack} = useBackHandler();
  const {
    detailData,
    isDetailSuccess,
    selectedFilter,
    setSelectedFilter,
    sortedComments,
    comment,
    setComment,
    handleComment,
  } = useDetail();

  const translateY = useRef(new Animated.Value(0)).current; // 애니메이션 값 설정

  useEffect(() => {
    // 키보드가 열릴 때
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        Animated.timing(translateY, {
          toValue: -12, // 키보드 높이만큼 댓글창을 위로 올림
          duration: 250,
          useNativeDriver: true,
        }).start();
      },
    );

    // 키보드가 닫힐 때
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        Animated.timing(translateY, {
          toValue: 0, // 원래 위치로 돌아옴
          duration: 250,
          useNativeDriver: true,
        }).start();
      },
    );

    return () => {
      // 리스너 정리
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [translateY]);

  return (
    <DetailContainer>
      <DetailBox>
        <DetailBack activeOpacity={1} onPress={handleBack}>
          <DesignIcon type="back" size="l" color={colors.TextNeutral} />
        </DetailBack>
        <ScrollView
          contentContainerStyle={{
            paddingBottom: detailData?.comments.length ? 0 : 64,
          }}
          showsVerticalScrollIndicator={false}>
          {detailData && isDetailSuccess && (
            <CommunityCard
              imageUrl={detailData?.imageUrl}
              name={detailData?.name}
              title={detailData?.title}
              content={detailData?.content}
              like={detailData?.like}
              userId={detailData?.userId}
              id={detailData?.id}
            />
          )}
          <CommentInformation
            commentLength={detailData?.comments.length || 0}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
          />
          <DetailComments>
            {sortedComments.map(commentItem => (
              <CommentListItem
                key={commentItem.id}
                id={commentItem.id}
                userId={commentItem.userId}
                userName={commentItem.userName}
                imageUrl={commentItem.imageUrl}
                content={commentItem.content}
                createTime={commentItem.createTime}
              />
            ))}
          </DetailComments>
        </ScrollView>
      </DetailBox>
      <Animated.View style={{transform: [{translateY}]}}>
        <CommentInput
          value={comment}
          onChangeText={setComment}
          handleComment={handleComment}
        />
      </Animated.View>
    </DetailContainer>
  );
}
