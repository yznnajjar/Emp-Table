import _ from 'lodash';

export const capitalizeWord = (word) => {
  return (
    word.charAt(0).toUpperCase() +
    word.slice(1).replaceAll("_", " ").toLowerCase()
  );
};

export const test  = (data) =>{

}
