import React from 'react';
import { shallow } from 'enzyme';
import Panel from '../../../src/components/common/panel.jsx';

// render > findNode > checkContent
/* Testing patterns
  it('should render children when passed in', () => {});
  it('should not render xxx if yyy is not provided', () => {});
  it('should render xxx if yyy is provided', () => {});
  it('should still render xxx even if yyy is not provided', ()

  it("renders a circle for each datapoint"
  it("renders a list in a box with proper CSS classes and people within it"
    (exists of node, number of node, content of node)
    (test first)
    (fail first)
*/

describe('<Panel />', () => {

  /**
   * 1. [testing structure] Given properties and state, what structure our rendered tree will have?
   */

  // Check exists of node for specific props

  it('should not render div.panel-heading if header is null or empty string', () => {
    const wrapper1 = shallow(<Panel header={null} />);
    const wrapper2 = shallow(<Panel header="" />);
    expect(wrapper1.find('div.panel-heading')).to.have.length(0);
    expect(wrapper2.find('div.panel-heading')).to.have.length(0);
  });

  it('should not render div.panel-footer if footer is null or empty string', () => {
    const wrapper1 = shallow(<Panel footer={null} />);
    const wrapper2 = shallow(<Panel footer="" />);
    expect(wrapper1.find('div.panel-footer')).to.have.length(0);
    expect(wrapper2.find('div.panel-footer')).to.have.length(0);
  });

  // Check number of nodes for specific props

  it('should render 2 div if no prop provided', () => {
    const wrapper = shallow(<Panel />);
    expect(wrapper.find('div')).to.have.length(2);
  });

  it('should render 3 divs if either header or footer is provided', () => {
    const wrapper1 = shallow(<Panel header="Header" />);
    const wrapper2 = shallow(<Panel footer="Footer" />);
    expect(wrapper1.find('div')).to.have.length(3);
    expect(wrapper2.find('div')).to.have.length(3);
  });

  it('should render 4 divs if both header and footer are provided', () => {
    const wrapper = shallow(<Panel header="Header" footer="Footer" />);
    expect(wrapper.find('div')).to.have.length(4);
  });

  it('should still render div.panel-body even if no children', () => {
    const wrapper = shallow(<Panel />);
    expect(wrapper.find('div.panel-body')).to.have.length(1);
  });

  // Check content of node for specific children

  it('should render children when passed in', () => {
    const wrapper = shallow(
      <Panel>
        <div className="unique" />
      </Panel>
    );
    expect(wrapper.contains(<div className="unique" />)).to.equal(true);
  });

  it('should wrap a header with a <div> with proper class name', function() {
    const wrapper = shallow(<Panel Header="greeter" />);

    expect(rootElement.tagName).to.be.equal('div');
    expect(rootElement.classList.length).to.be.equal(1);
    expect(rootElement.classList[0]).to.be.equal('greeter');
  });

  /**
   * 2. [testing behavior] Given an output of render, is there a possibility to transition from state A to state B?
   */

});
