import BaseBg from 'components/Base-background';
import React from 'react';
import { useRouteMatch } from 'react-router-dom';

TopicFeature.propTypes = {};

function TopicFeature(props) {
  const match = useRouteMatch();
  return (
    <div>
      <BaseBg />
    </div>
  );
}

export default TopicFeature;