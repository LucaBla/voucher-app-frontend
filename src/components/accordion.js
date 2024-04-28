import React, { useState } from 'react';
import { ChevronDown } from 'react-feather';
import { useSpring, animated } from 'react-spring';

function Accordion({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  const contentSpring = useSpring({
    maxHeight: isOpen ? '500px' : '0px',
    overflow: 'hidden',
    config: { duration: isOpen ? 500 : 400},
  });

  const chevronSpring = useSpring({
    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
  });

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion">
      <div className="accordion-header" onClick={toggleAccordion}>
        {title}
        <animated.div style={chevronSpring}>
          <ChevronDown />
        </animated.div>
      </div>
      <animated.div className="accordion-content" style={contentSpring}>
        {children}
      </animated.div>
    </div>
  );
}

export default Accordion;