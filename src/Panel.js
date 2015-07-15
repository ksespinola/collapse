'use strict';

const { createClass, PropTypes, findDOMNode } = require('react');
const classnames = require('classnames');
const cssAnimation = require('css-animation');

module.exports = createClass({

  displayName: 'CollapsePanel',

  propTypes: {
    prefixCls: PropTypes.string,
    header: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.node
    ]),
    isActive: PropTypes.bool,
    onItemClick: PropTypes.func,
    maxHeight:PropTypes.number
  },

  getInitialState() {
    return { isActive: this.props.isActive };
  },

  getDefaultProps() {
    return {
      isActive: false,
      onItemClick: () => {}
    };
  },

  handleItemClick() {
    this.props.onItemClick();
  },

  render() {
    let { prefixCls, header, children, isActive } = this.props;

    let headerCls = `${prefixCls}-header`;
    let contentCls = classnames({
      [`${prefixCls}-content`]: true,
      [`${prefixCls}-content-active`]: isActive
    });
    let itemCls = classnames({
      [`${prefixCls}-item`]: true,
      [`${prefixCls}-item-active`]: isActive
    });

    return (
      <div className={itemCls}>
        <div className={headerCls} onClick={this.handleItemClick}
          role="tab" aria-expanded={isActive}>{header}</div>
        <div className={contentCls} ref="content" role="tabpanel">
          <div className={`${prefixCls}-content-box`}>{children}</div>
        </div>
      </div>
    );
  },

  componentDidMount() {
    if (this.props.isActive) {
      var el = findDOMNode(this.refs.content);
      el.style.height = 'auto';
    }
  },

  componentDidUpdate(prevProps) {

    var isActive = this.props.isActive;

    // no change
    if (prevProps.isActive === isActive) {
      return;
    }

    this._anim(isActive ? 0 : 1);
  },

  _anim(opacity) {
    var el = findDOMNode(this.refs.content);
    const{
        maxHeight,
        } = this.props;
    var scrollHeight = `${maxHeight ? maxHeight : el.scrollHeight}px`;

    // start state
    el.style.height = opacity ? scrollHeight : 0;


    cssAnimation.setTransition(el, 'Property', 'height');
    cssAnimation.style(el, {
      height: opacity ? 0 : scrollHeight
    }, () => {
      const {
          maxHeight,
          } = this.props;
      el.style.height = opacity ? 0 : (maxHeight ? scrollHeight : 'auto');
      cssAnimation.setTransition(el, 'Property', '');
    });
  }

});
