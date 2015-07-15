'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('react');

var createClass = _require.createClass;
var PropTypes = _require.PropTypes;
var findDOMNode = _require.findDOMNode;

var classnames = require('classnames');
var cssAnimation = require('css-animation');

module.exports = createClass({

  displayName: 'CollapsePanel',

  propTypes: {
    prefixCls: PropTypes.string,
    header: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.node]),
    isActive: PropTypes.bool,
    onItemClick: PropTypes.func,
    maxHeight: PropTypes.number
  },

  getInitialState: function getInitialState() {
    return { isActive: this.props.isActive };
  },

  getDefaultProps: function getDefaultProps() {
    return {
      isActive: false,
      onItemClick: function onItemClick() {}
    };
  },

  handleItemClick: function handleItemClick() {
    this.props.onItemClick();
  },

  render: function render() {
    var _classnames, _classnames2;

    var _props = this.props;
    var prefixCls = _props.prefixCls;
    var header = _props.header;
    var children = _props.children;
    var isActive = _props.isActive;

    var headerCls = prefixCls + '-header';
    var contentCls = classnames((_classnames = {}, _defineProperty(_classnames, prefixCls + '-content', true), _defineProperty(_classnames, prefixCls + '-content-active', isActive), _classnames));
    var itemCls = classnames((_classnames2 = {}, _defineProperty(_classnames2, prefixCls + '-item', true), _defineProperty(_classnames2, prefixCls + '-item-active', isActive), _classnames2));

    return React.createElement(
      'div',
      { className: itemCls },
      React.createElement(
        'div',
        { className: headerCls, onClick: this.handleItemClick,
          role: 'tab', 'aria-expanded': isActive },
        header
      ),
      React.createElement(
        'div',
        { className: contentCls, ref: 'content', role: 'tabpanel' },
        React.createElement(
          'div',
          { className: prefixCls + '-content-box' },
          children
        )
      )
    );
  },

  componentDidMount: function componentDidMount() {
    if (this.props.isActive) {
      var el = findDOMNode(this.refs.content);
      el.style.height = 'auto';
    }
  },

  componentDidUpdate: function componentDidUpdate(prevProps) {

    var isActive = this.props.isActive;

    // no change
    if (prevProps.isActive === isActive) {
      return;
    }

    this._anim(isActive ? 0 : 1);
  },

  _anim: function _anim(opacity) {
    var el = findDOMNode(this.refs.content);
    var maxHeight = this.props.maxHeight;

    var scrollHeight = (maxHeight ? maxHeight : el.scrollHeight) + 'px';

    // start state
    el.style.height = opacity ? scrollHeight : 0;

    cssAnimation.setTransition(el, 'Property', 'height');
    cssAnimation.style(el, {
      height: opacity ? 0 : scrollHeight
    }, function () {
      el.style.height = opacity ? 0 : maxHeight ? scrollHeight : 'auto';
      cssAnimation.setTransition(el, 'Property', '');
    });
  }

});