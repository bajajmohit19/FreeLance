import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { ThemedView, Header } from 'src/components';
import { TextHeader, IconHeader } from 'src/containers/HeaderComponent';
import Empty from 'src/containers/Empty';
import Container from 'src/containers/Container';
import Detail from 'src/containers/vendor/Detail';
import { ItemVendor } from 'src/containers/vendor';
import { authSelector } from 'src/modules/auth/selectors';
import { ScrollView, StyleSheet } from 'react-native'
import {
  Loading,
} from 'src/components';
import { detailVendorSelector } from 'src/modules/vendor/selectors';

function StoreDetail(props) {
  const { t, vendorDetail, auth: { vendorsList, productsByVenderLoader, productsByVendors }, ...rest } = props;
  console.log("productbyvendors", productsByVendors)
  if (productsByVendors && productsByVendors.size < 1) {
    return (
      <ThemedView isFullView>
        <Header
          leftComponent={<IconHeader />}
          rightComponent={<TextHeader title={t('catalog:text_store_detail')} />}
        />
        <Empty
          icon="box"
          title={t('empty:text_title_product')}
          subTitle={t('empty:text_subtitle_product')}
          titleButton={t('common:text_go_shopping')}
        />
      </ThemedView>
    );
  }

  return (
    <ThemedView isFullView>
      <Header
        leftComponent={<IconHeader />}
      // centerComponent={
      //   <TextHeader title={vendorDetail.get('store_name')} />
      // }
      />
      <Container>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>

          {productsByVenderLoader
            ? <Loading visible={productsByVenderLoader} />
            : productsByVendors && productsByVendors?.productsList.map((item, index) => (
              console.log("item", item),
              <ItemVendor
                key={item?.product_enc_id}
                type="secondary"
                store={item}
                style={[
                  styles.viewItem
                  // index === data.length - 1 && { marginRight: padEnd },
                ]}
              // onPress={() => this.clickDetailVendor(item)}
              />
            ))}
        </ScrollView>
      </Container>
      <Detail vendorDetail={productsByVendors} {...rest} />
    </ThemedView>
  );
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

const mapStateToProps = (state) => {
  return {
    vendorDetail: detailVendorSelector(state),
    auth: authSelector(state)

  };
};
export default connect(mapStateToProps)(withTranslation()(StoreDetail));
