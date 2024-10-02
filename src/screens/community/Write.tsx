/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  WriteContainer,
  WriterContentInput,
  WriterForm,
  WriterPlaceholder,
  WriterTitle,
  WriterTitleInput,
  WriterTop,
} from './styles';
import {TouchableOpacity} from 'react-native';
import DesignIcon from '../../components/icon/DesignIcon';
import {colors} from '../../styles/colors';
import {useBackHandler} from '../../modules/commonHooks';
import OutlineButton from '../../components/button/OutlineButton';
import {useWrite} from './hooks';

export default function Write() {
  const {handleBack} = useBackHandler();
  const {title, setTitle, content, setContent, handleCreate} = useWrite();

  return (
    <WriteContainer>
      <WriterTop>
        <TouchableOpacity activeOpacity={1} onPress={handleBack}>
          <DesignIcon type="back" size="l" color={colors.TextNeutral} />
        </TouchableOpacity>
        <WriterTitle weight="bold">글 작성중</WriterTitle>
        <OutlineButton
          size="s"
          disabled={!title || !content}
          onPress={handleCreate}>
          등록
        </OutlineButton>
      </WriterTop>
      <WriterForm>
        <WriterTitleInput
          placeholder="글의 제목을 입력해주세요"
          placeholderTextColor={colors.TextDisabled}
          value={title}
          onChangeText={setTitle}
        />
        <WriterContentInput
          placeholder="나만의 관리 꿀팁이나, 궁금했던 점을 남겨주세요."
          placeholderTextColor={colors.TextDisabled}
          multiline={true}
          style={{textAlignVertical: 'top'}}
          value={content}
          onChangeText={setContent}
        />
        {!content && (
          <WriterPlaceholder>
            욕설, 비방 등 불쾌감을 조성하는 내용은 엄격히 금지해요.{'\n'}
            위반 시 게시글이 무통보로 삭제되며 커뮤니티 이용이{'\n'}
            제한될 수 있어요.
          </WriterPlaceholder>
        )}
      </WriterForm>
    </WriteContainer>
  );
}
