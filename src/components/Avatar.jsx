import React from "react";

const Avatar = ({ userId, size, borderRadius, children }) => {
  const generateColor = (str) => {
    return "#" + Math.floor(Math.abs(Math.sin(parseInt(str, 36)) * 16777215) % 16777215).toString(16);
  };

  const style = {
    backgroundColor: generateColor(userId),
    width: size,
    height: size,
    borderRadius,
    border:'1px solid white',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  };

  return <div style={style}>{children}</div>;
};

export default Avatar;
































































// import React from "react";

// const Avatar = ({
//   children,
//   backgroundColor,
//   px,
//   py,
//   color,
//   borderRadius,
//   fontSize,
//   cursor,
// }) => {
//   const style = {
//     backgroundColor,
//     padding: `${py} ${px}`,
//     color: color || "black",
//     borderRadius,
//     fontSize,
//     textAlign: "center",
//     cursor: cursor || null,
//     textDecoration: "none",
//   };

//   return <div style={style}>{children}</div>;
// };

// export default Avatar;
