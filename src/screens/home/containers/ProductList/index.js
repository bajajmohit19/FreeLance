import React, { Component } from 'react';

import { Map } from 'immutable';
import take from 'lodash/take';
import isEqual from 'lodash/isEqual';
import split from 'lodash/split';

import { ItemVendorLoading, ItemVendor } from 'src/containers/vendor';
import { withNavigation } from '@react-navigation/compat';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { mainStack } from 'src/config/navigator';
import { productListTypes } from 'src/config/product';

import { StyleSheet, ScrollView } from 'react-native';
import Container from 'src/containers/Container';
import Heading from 'src/containers/Heading';
import Products from '../Products';
import { padding } from 'src/components/config/spacing';
import { authSelector } from 'src/modules/auth/selectors';
import { getNewArrivals } from 'src/modules/auth/actions';
import {
  Loading,
} from 'src/components';
import {
  currencySelector,
  defaultCurrencySelector,
  languageSelector,
  daysBeforeNewProductSelector,
} from 'src/modules/common/selectors';
import { getProducts, topSellers } from 'src/modules/product/service';
import { prepareProductItem } from 'src/utils/product';

const initHeader = {
  style: {},
};

const getType = (fields) => {
  if (!fields) {
    return productListTypes.latest;
  }
  const type =
    fields.product_type && fields.product_type.type
      ? fields.product_type.type
      : fields.type
        ? fields.type
        : productListTypes.latest;
  return type;
};

const getInclude = (fields) => {
  if (!fields) {
    return [];
  }
  const ids =
    fields.product_type &&
      fields.product_type.type === productListTypes.custom &&
      fields.product_type.ids
      ? fields.product_type.ids
      : '';
  return split(ids, ',');
};

const valueLimit = (fields) => {
  if (!fields) {
    return 4;
  }
  const count =
    fields.limit && parseInt(fields.limit, 10) ? parseInt(fields.limit, 10) : 4;
  return !count || !count < 0 ? 4 : count;
};

class ProductList extends Component {

  constructor(props, context) {
    const { fields } = props
    super(props, context);
    const type = getType(props.fields);
    const per_page = valueLimit(props.fields);
    const include = getInclude(props.fields);


    this.state = {
      data: [],
      loading: false,
      per_page,
      type,
      include: include,
      limit:
        fields && fields.limit && parseInt(fields.limit, 10)
          ? parseInt(fields.limit, 10)
          : 4,
    };
  }

  //
  componentDidMount() {
    this.fetchData();
    // if (this.props.fields) {
    // this.getFilter();
    // }
  }

  getFilter = async (type = this.state.type) => {
    try {
      let results = this.state.include;
      if (type === productListTypes.best_sales) {
        const topSellerProducts = await topSellers({
          period: 'year',
        });
        if (topSellerProducts.length) {
          results = topSellerProducts.map(({ product_id }) => product_id);
        }
      }
      this.setState(
        {
          include: results,
        },
        this.fetchData,
      );
    } catch (e) {
      this.fetchData();
    }
  };

  fetchData = () => {
    this.props.dispatch(getNewArrivals({ city: 'ludhiana' }))
  };

  componentWillUnmount() {
    if (this.abortController) {
      this.abortController.abort();
    }
  }

  componentDidUpdate(prevProps) {

    if (!isEqual(prevProps.fields, this.props.fields)) {
      const per_page = valueLimit(this.props.fields);
      const type = getType(this.props.fields);
      const include = getInclude(this.props.fields);
      this.loadingData(per_page, type, include);
    }
  }

  loadingData = (per_page, type, include) => {
    this.setState(
      {
        per_page,
        type,
        include,
      },
      () => this.getFilter(type, per_page),
    );
  };

  /**
   * Prepare product item to render on FlatList
   * @param item
   * @returns {*}
   */
  prepareProduct = (item) => {
    const { currency, defaultCurrency, days,
    } = this.props
    const mapItem = Map(item);
    const result = prepareProductItem(mapItem, currency, defaultCurrency, days);
    return result.toJS();
  };
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
      navigation,
      navigationType,
      headingElement,
      layout,
      fields,
      widthComponent,
      language,
      t,
      auth: { homeNewArrivals, homeNewArrivalLoader },
    } = this.props;
    const { data, per_page, loading, include } = this.state;

    if (
      !fields ||
      typeof fields !== 'object' ||
      Object.keys(fields).length < 1
    ) {
      return null;
    }
    const heading = fields.text_heading ? fields.text_heading : initHeader;
    // const listData = !homeNewArrivalLoader ? homeNewArrivals.map(this.prepareProduct) : null;


    const headerDisable = !fields.boxed ? 'all' : 'none';
    const padEnd = fields.boxed ? padding.large : 0;


    return (
      <>
        {headingElement ||
          (fields && fields.disable_heading && (
            <Container disable={headerDisable}>
              {headingElement ? (
                headingElement
              ) : (
                <Heading
                  title={
                    heading.text && heading.text[language]
                      ? heading.text[language]
                      : t('common:text_product')
                  }
                  style={heading.style}
                  containerStyle={styles.header}
                  onPress={() =>
                    navigation.navigate(mainStack.products, {
                      name: heading.text[language],
                      filterBy: Map({
                        include: include,
                      }),
                    })
                  }
                  subTitle={t('common:text_show_all')}
                />
              )}
            </Container>
          ))}
        {
          // <Products
          //   data={listData}
          //   layout={layout}
          //   fields={fields}
          //   widthComponent={widthComponent}
          //   navigationType={navigationType}
          //   limit={per_page}
          //   loading={homeNewArrivalLoader}
          // />
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {homeNewArrivalLoader
              ? this.renderLoading(padEnd)
              : homeNewArrivals && homeNewArrivals.map((item, index) => (
                <ItemVendor
                  key={item?.product_inc_id}
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
        }

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

ProductList.defaultProps = {
  headingElement: null,
  // layout: productListLayout.slide,
};

const mapStateToProps = (state) => ({
  currency: currencySelector(state),
  defaultCurrency: defaultCurrencySelector(state),
  language: languageSelector(state),
  days: daysBeforeNewProductSelector(state),
  auth: authSelector(state)

});

export default compose(
  withTranslation(),
  withNavigation,
  connect(mapStateToProps),
)(ProductList);
