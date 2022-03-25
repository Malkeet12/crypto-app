const AssetTile = (props) => {
    const {
        icon,
        displaySymbol,
        assetCode,
        name,
        value,
        rawPercentageChange,
        percentageColor,
        arrowIcon,
        valueColor,
    } = props
    return (<li className={`asset asset-${assetCode}`} >
        <div className='symbol-info'>
            <img className='symbol-icon' src={icon} alt={name}></img>
            <div className='symbol-name-description'>
                <span>{displaySymbol}</span>
                <span className='symbol-name'>{name}</span>
            </div>
        </div>
        <div className='symbol-price'>
            <span className='symbol-current-price' style={{ color: valueColor }} >{value}</span>
            <div className='symbol-price-change'>
                <span className={arrowIcon === 'GREEN' ? 'up-arrow' : 'down-arrow'} style={{ color: arrowIcon }}></span>
                <span className='percentage' style={{ color: percentageColor }}>{rawPercentageChange}%</span>
            </div>
        </div>
    </li>)
}
export default AssetTile