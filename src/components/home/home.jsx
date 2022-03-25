import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { fetchAssets } from "./homeAction";
import './home.scss'
import InfiniteScroll from 'react-infinite-scroll-component';
import AssetTile from './assetTile';
import CommonUtils from '../../utils/commonUtils';

const Home = (props) => {
    useEffect(() => {
        props.dispatch(fetchAssets({}));
    }, [])

    const isScrolling = () => {
        for (const key of Object.keys(props.assets)) {
            const { assetCode } = assets[key]
            const element = window.document.querySelector(`.asset-${assetCode}`)
            console.log(element)
            CommonUtils.toggleSubscription(key, element)
        }
    }
    const { error, loading, assets = [], page, totalPageCount } = props;
    if (loading && !Object.keys(assets).length) return <div className="loader" ></div>
    return (
        <main>
            <InfiniteScroll
                dataLength={Object.keys(assets).length}
                next={() => props.dispatch(fetchAssets({ page: props.page + 1 }))}
                hasMore={page < totalPageCount}
                scrollThreshold={0.5}
                onScroll={isScrolling}
                loader={<div className='tiny-loader'>Loading...</div>}>
                <ul className='assets-list'>
                    {Object.keys(assets).map(item => {
                        const { subscriptionId } = assets[item]
                        return <AssetTile key={subscriptionId} {...assets[item]} />
                    })}
                </ul>
            </InfiniteScroll>
            {error ? showError() : ''}
        </main >

    );

    function showError() {
        return (<div className="error">Something went wrong, please try again later</div>)
    }
}
const mapStateToProps = state => ({
    assets: state.home.assets,
    loading: state.home.loading,
    error: state.home.error,
    page: state.home.page,
    totalCount: state.home.totalCount,
    totalPageCount: state.home.totalPageCount,
});

export default connect(mapStateToProps)(Home);
