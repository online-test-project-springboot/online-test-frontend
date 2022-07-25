import GoLinkForm from './GoLinkForm';

GoLink.propTypes = {};

function GoLink(props) {
  const handleLink = (values) => {
    window.location.assign(values.link);
  };
  return (
    <div>
      <GoLinkForm handleLink={handleLink} />
    </div>
  );
}

export default GoLink;
