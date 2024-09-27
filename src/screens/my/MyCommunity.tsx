import React from 'react';
import {
  MyCommunityContainer,
  MyCommunityContent,
  MyMoreTitle,
  MyMoreTop,
} from './styles';
import {TouchableOpacity} from 'react-native';
import DesignIcon from '../../components/icon/DesignIcon';
import {colors} from '../../styles/colors';
import {useBackHandler} from '../../modules/commonHooks';
import {useMyCommunity} from './hooks';
import CommunityListItem from '../../components/list/community/CommunityListItem';

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
      <MyCommunityContent>
        <CommunityListItem />
      </MyCommunityContent>
    </MyCommunityContainer>
  );
}
