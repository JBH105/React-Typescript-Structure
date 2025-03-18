export const classDetailsDefaultStyles = {
  bgColor: ['#C4FFDF', '#FAEDCC', '#F8D5D3', '#DCEEFD'],
  textColor: ['#00AC4F', '#BB7C39', '#F2431B', '#4B8EE8'],
  borderColor: ['#00AC4F', '#BB7C39', '#F2431B', '#4B8EE8']
};

export const defaultColors = ['#00B894', '#3E88FA', '#FF9607', '#DF0404', '#A8A8A8'];

export const useClassStyles = () => {
  const getClassStyles = (index: number) => {
    const bgColor = classDetailsDefaultStyles.bgColor[index % classDetailsDefaultStyles.bgColor.length];
    const textColor = classDetailsDefaultStyles.textColor[index % classDetailsDefaultStyles.textColor.length];
    const borderColor = classDetailsDefaultStyles.borderColor[index % classDetailsDefaultStyles.borderColor.length];

    return { bgColor, textColor, borderColor };
  };

  const getBorderColor = (index: number, colors?: string[]): string => {
    return colors ? colors[index % colors.length] : defaultColors[index % defaultColors.length];
  };

  return { getClassStyles, getBorderColor };
};
