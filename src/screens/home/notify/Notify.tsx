import React from 'react';
import {
  NotifyBox,
  NotifyContainer,
  NotifyContent,
  NotifyTitle,
  SearchBack,
} from './styles';
import DesignIcon from '../../../components/icon/DesignIcon';
import {colors} from '../../../styles/colors';
import {useBackHandler} from '../../../modules/commonHooks';
import {NotifyCard} from './NotifyCard';
import {FlatList} from 'react-native';
import useNotify from './hooks';

export default function Notify() {
  const {handleBack} = useBackHandler();
  const {data, isSuccess} = useNotify();

  return (
    <NotifyContainer>
      <SearchBack activeOpacity={1} onPress={handleBack}>
        <DesignIcon type="back" size="l" color={colors.TextNeutral} />
      </SearchBack>
      <NotifyBox>
        <NotifyTitle weight="bold">알림</NotifyTitle>
        {isSuccess && (
          <FlatList
            data={data}
            renderItem={({item}) => (
              <NotifyCard
                title={item.title}
                date={item.create_At}
                body={item.body}
              />
            )}
            ItemSeparatorComponent={NotifyContent}
            keyExtractor={item => item.id.toString()}
          />
        )}
      </NotifyBox>
    </NotifyContainer>
  );
}
