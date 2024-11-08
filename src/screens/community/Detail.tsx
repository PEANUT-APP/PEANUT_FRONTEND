/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {DetailContainer, DetailBox, DetailBack, DetailComments} from './styles';
import DesignIcon from '../../components/icon/DesignIcon';
import {colors} from '../../styles/colors';
import {useBackHandler} from '../../modules/commonHooks';
import CommentInput from './comment/CommentInput';
import CommunityCard from './card/CommunityCard';
import {useDetail} from './hooks';
import {ScrollView} from '../layout/styles';
import CommentInformation from './comment/CommentInformatin';
import CommentListItem from '../../components/list/comment/CommentListItem';
import {KeyboardAvoidingView} from 'react-native';

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

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="height">
      <DetailContainer>
        <DetailBox>
          <DetailBack activeOpacity={1} onPress={handleBack}>
            <DesignIcon type="back" size="l" color={colors.TextNeutral} />
          </DetailBack>
          <ScrollView
            contentContainerStyle={{
              paddingBottom: detailData?.comments.length ? 0 : 64,
            }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">
            {detailData && isDetailSuccess && (
              <CommunityCard
                imageUrl={detailData?.imageUrl}
                nickName={detailData?.nickName}
                title={detailData?.title}
                content={detailData?.content}
                like={detailData?.like}
                userId={detailData?.userId}
                id={detailData?.id}
                liked={detailData?.liked}
                create_At={detailData?.create_At}
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
        <CommentInput
          value={comment}
          onChangeText={setComment}
          handleComment={handleComment}
        />
      </DetailContainer>
    </KeyboardAvoidingView>
  );
}
