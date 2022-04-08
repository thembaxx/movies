export const actions = {
  setData: "setData",
};

export const initialsArgs = {
  genres: [],
  countries: [],
  certifications: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.setData:
      return {
        genres: action.payload?.genres,
        countries: action.payload?.countries,
        certifications: action.payload?.certifications,
      };
    default:
      throw new Error();
  }
};
