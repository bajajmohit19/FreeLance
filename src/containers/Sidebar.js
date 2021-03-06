import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {StyleSheet, ScrollView} from 'react-native';
import {ThemedView, Text, ListItem} from 'src/components';
import ItemCategoryMenu from './ItemCategoryMenu';

import {categorySelector} from 'src/modules/category/selectors';
import {configsSelector, languageSelector} from 'src/modules/common/selectors';
import { authSelector} from 'src/modules/auth/selectors';
import {padding, margin} from 'src/components/config/spacing';

import {homeTabs, mainStack} from 'src/config/navigator';
import {excludeCategory} from '../utils/category';
import {exclude_categories_sidebar} from '../config/category';
import HeaderMe from '../screens/profile/containers/HeaderMe';

class Sidebar extends React.Component {
  handlePage = (router, params = {}) => {
    const {navigation} = this.props;
    if (!navigation) {
      return null;
    }
    navigation.navigate(router, params);
  };

  render() {
    const {t, category, configs, language, navigation, auth} = this.props;
    const dataHelpInfoSeller = [
      {
        id: '1',
        name: t('common:text_home'),
        router: mainStack.home_tab,
        params: {
          screen: homeTabs.home_drawer,
        },
      },
      {
        id: '2',
        name: 'Update Seller' ,
        router: mainStack.become_a_seller,
      
      },
     
      {
        id: '3',
        name: t('common:text_about'),
        router: mainStack.page,
        params: {
          id: configs.getIn(['about', language]),
          type: 'page',
        },
      },
     
      {
        id: '5',
        name: t('common:text_privacy_full'),
        router: mainStack.page,
        params: {
          id: configs.getIn(['policy', language]),
          type: 'page',
        },
      },
      {
        id: '6',
        name: 'common:text_contact',
        router: mainStack.contact,
      },
      {
        id: '7',
        name:  'common:show_biz',
        router: mainStack.show_biz,
      } ,
      {
        id: '8',
        name: 'common:qr_code',
        router: mainStack.qr_code,
      },
      {
        id: '9',
        name: 'common:wallet',
        router: mainStack.wallet,
      },
    ]
    const dataHelpInfo = [
      {
        id: '1',
        name: t('common:text_home'),
        router: mainStack.home_tab,
        params: {
          screen: homeTabs.home_drawer,
        },
      },
      {
        id: '2',
        name:  'Become A Seller',
        router: mainStack.become_a_seller,
      
      },
     
      {
        id: '3',
        name: t('common:text_about'),
        router: mainStack.page,
        params: {
          id: configs.getIn(['about', language]),
          type: 'page',
        },
      },
     
      {
        id: '5',
        name: t('common:text_privacy_full'),
        router: mainStack.page,
        params: {
          id: configs.getIn(['policy', language]),
          type: 'page',
        },
      },
      {
        id: '6',
        name: 'common:text_contact',
        router: mainStack.contact,
      },
     
  
      {
        id:  '7' ,
        name: 'common:wallet',
        router: mainStack.wallet,
      },
    ];

    const {data} = category;

    // Filter include category
    const _data = excludeCategory(data, exclude_categories_sidebar);
    return (
      <ThemedView isFullView>
        <ScrollView>
        
        <HeaderMe />
       
          {auth?.user?.user_type == 'SELLER' ?  dataHelpInfoSeller.map((value) => (
            <ListItem
              key={value.id}
              title={t(value.name)}
              titleProps={{
                medium: true,
              }}
              type="underline"
              small
              containerStyle={styles.item}
              onPress={() => this.handlePage(value.router, value.params)}
            />
          ))  :  dataHelpInfo.map((value) => (
            <ListItem
              key={value.id}
              title={t(value.name)}
              titleProps={{
                medium: true,
              }}
              type="underline"
              small
              containerStyle={styles.item}
              onPress={() => this.handlePage(value.router, value.params)}
            />))}
        </ScrollView>
      </ThemedView>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    marginTop: margin.big + 4,
    marginBottom: margin.small + 1,
    paddingHorizontal: padding.large,
  },
  titleHead: {
    paddingTop: getStatusBarHeight(),
  },
  item: {
    paddingHorizontal: padding.large,
  },
});

const mapStateToProps = (state) => ({
  category: categorySelector(state),
  configs: configsSelector(state),
  language: languageSelector(state),
  auth: authSelector(state)
});
export default connect(mapStateToProps)(withTranslation()(Sidebar));
