import React, { Component } from 'react';

import { connect } from 'react-redux';
import { compose } from 'recompose';

import { Dimensions, StyleSheet, ScrollView } from 'react-native';
import { withNavigation } from '@react-navigation/compat';
import { withTranslation } from 'react-i18next';
import { categorySelector } from 'src/modules/category/selectors';

import Container from 'src/containers/Container';
import Heading from 'src/containers/Heading';

import { ItemVendorLoading, ItemVendor } from 'src/containers/vendor';

import {
  Loading,
} from 'src/components';

import Gird from './Gird';
import Row from './Row';

import { homeTabs } from 'src/config/navigator';
import { languageSelector } from 'src/modules/common/selectors';
import { authSelector } from 'src/modules/auth/selectors';
import { padding } from 'src/components/config/spacing';
import { getHomeCategories } from 'src/modules/auth/actions';
import { typeShowCategory } from 'src/config/category';

const initHeader = {
  style: {},
};

const { width } = Dimensions.get('window');

class CategoryList extends Component {
  constructor(props) {
    super(props);
    const { fields } = props;

    this.state = {
      data: [], limit:
        fields && fields.limit && parseInt(fields.limit, 10)
          ? parseInt(fields.limit, 10)
          : 4,
    };
  }
  componentDidMount() {
    this.props.dispatch(getHomeCategories({ city: 'ludhiana' }))
  }


  renderLoading = (padEnd) => {
    const { limit } = this.state;
    const listData = Array.from(Array(limit)).map((arg, index) => index);
    return listData.map((value) => (
      <ItemVendorLoading
        key={value}
        type="secondary"
        style={[
          styles.viewItem,
          value === listData.length - 1 && { marginRight: padEnd },
        ]}
      />
    ));
  };
  render() {
    const {
      category,
      navigation,
      fields,
      layout,
      widthComponent,
      language,
      t,
      auth: { homeCategories, homeCategoryLoader },

    } = this.props;
    const { data } = this.state

    console.log("aaa", homeCategories)

    if (
      !fields ||
      typeof fields !== 'object' ||
      Object.keys(fields).length < 1
    ) {
      return null;
    }
    const heading = fields.text_heading ? fields.text_heading : initHeader;

    let widthImage =
      fields.width && parseInt(fields.width, 10)
        ? parseInt(fields.width, 10)
        : 109;
    let heightImage =
      fields.height && parseInt(fields.height, 10)
        ? parseInt(fields.height, 10)
        : 109;

    const dataParent = category.data.filter((item) => item.parent === 0);

    const limit =
      fields.limit && parseInt(fields.limit, 10)
        ? parseInt(fields.limit, 10)
        : dataParent.length;

    // const dataShow = this.state.homeCategoriesList.filter((_, index) => index < limit);
    // console.log("dataSho", dataShow)

    const widthView = fields.boxed
      ? widthComponent - 2 * padding.large
      : widthComponent;

    const headerDisable = !fields.boxed ? 'all' : 'none';
    const categoryDisable = fields.boxed
      ? typeShowCategory[layout] === 'grid'
        ? 'none'
        : 'right'
      : 'all';

    const ComponentCategory = typeShowCategory[layout] === 'grid' ? Gird : Row;
    const padEnd = fields.boxed ? padding.large : 0;


    return (
      <>
        {fields.disable_heading && (
          <Container disable={headerDisable}>
            <Heading
              title={
                heading.text && heading.text[language]
                  ? heading.text[language]
                  : t('common:text_category')
              }
              style={heading.style && heading.style}
              containerStyle={styles.header}
              subTitle={t('common:text_show_all')}
              onPress={() => navigation.navigate(homeTabs.shop)}
            />
          </Container>
        )}
        <Container disable={categoryDisable}>
          {/* <ComponentCategory
            data={dataShow}
            width={widthImage}
            height={heightImage}
            widthView={widthView}
            box={fields.boxed}
            round={fields.round_image}
            border={fields.border}
            disableName={fields.disable_text}
          /> */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {homeCategoryLoader
              ? this.renderLoading(padEnd)
              : homeCategories && homeCategories.map((item, index) => (
                <ItemVendor
                  key={item?.category_inc_id}
                  type="secondary"
                  store={item}
                  style={[
                    styles.viewItem,
                    index === data.length - 1 && { marginRight: padEnd },
                  ]}
                  onPress={() => this.clickDetailVendor(item)}
                />
              ))}
          </ScrollView>
        </Container>
      </>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 0,
  },

  viewItem: {
    marginRight: 10,
  },
  item: {
    flex: 1,
  },
});

const mapStateToProps = (state) => ({
  category: categorySelector(state),
  language: languageSelector(state),
  auth: authSelector(state)

});

CategoryList.defaultProps = {
  widthComponent: width,
};

export default compose(
  connect(mapStateToProps),
  withNavigation,
  withTranslation(),
)(CategoryList);
