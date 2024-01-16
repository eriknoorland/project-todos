const modifiers = (blockName: string, modifiers: string | undefined): string => {
  if (!modifiers) {
    return blockName;
  }

  const modifierClasses = modifiers
    .split(' ')
    .filter(modifier => !!modifier)
    .map(modifier => `${blockName}--${modifier}`)
    .join(' ');

  return `${blockName} ${modifierClasses}`;
}

export default modifiers;