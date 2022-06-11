const ExternalLink = ({ children, href }) => {
  return (
    <a
      target={href.startsWith('#') ? undefined : '_blank'}
      href={href}
      rel='noopener noreferrer'
      className={`${href.startsWith('#') ? undefined : 'text-white'}`}
    >
      {children}
    </a>
  );
};

export default ExternalLink;
