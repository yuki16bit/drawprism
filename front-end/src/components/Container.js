/* Props Desc
  additionalClassName: string, add additional tailwind css class if needed, separate classes name by space.
*/

const Container = ({ children, additionalClassName }) => {
  return (
    <div
      className={`lg:px-18 container mx-auto px-6 md:px-12 xl:px-24 2xl:px-36 ${
        additionalClassName ? additionalClassName : ''
      }`}
    >
      {children}
    </div>
  );
};

export default Container;
