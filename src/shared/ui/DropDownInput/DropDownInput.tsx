import styles from './_DropDownInput.module.scss';
import cn from 'classnames';
import useDropDownInput from './_useDropDownInput';
import { LegacyRef } from 'react';

interface IDropDownInput {
  values: readonly string[];
  state: string | null;
  setState: ((newVal: string | null) => void) | ((newVal: string) => void);
  placeholder?: string;
  contentEditable?: boolean;
  ref?: LegacyRef<HTMLInputElement> | undefined | null;

}

export default function DropDownInput({
  values,
  state,
  setState,
  placeholder = 'Выберите значение',
  contentEditable = false,
  ref,
}: IDropDownInput) {
  const {
    handleOptionClick,
    onChangeInput,
    onKeyInput,
    onKeyOption,
    handleBlur,
    handleFocus,
    listKey,
    isFocused,
    isOpen,
    inputRef,
    listRef,
    visibleList,
  } = useDropDownInput({
    values,
    styles,
    setState,
    contentEditable,
  });

  return (
    <div className={styles['drop-down-input']} ref={ref}>
      <div
        className={cn(
          styles['drop-down-input__value'],
          isOpen ? styles['drop-down-input__value_open'] : '',
          state || isFocused ? '' : styles['drop-down-input__value_placeholder'],
        )}
        onKeyDown={onKeyInput}
        tabIndex={0}
        role="input"
        contentEditable={contentEditable}
        suppressContentEditableWarning={contentEditable}
        onInput={onChangeInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
        ref={inputRef}
      >
        {state || isFocused ? state : placeholder}
      </div>
      <ul
        className={cn(styles['drop-down-input__list'], isOpen ? styles['drop-down-input__list_opened'] : '')}
        data-key={listKey}
        ref={listRef}
      >
        {visibleList.length ? (
          visibleList.map((el, i) => (
            <li
              key={`${i}_${el}`}
              className={cn(
                styles['drop-down-input__option'],
                state === el ? styles['drop-down-input__option_selected'] : '',
              )}
              onClick={() => handleOptionClick(i)}
              onKeyDown={(e) => onKeyOption(e, i)}
              onBlur={handleBlur}
              tabIndex={-1}
            >
              <span className={styles['drop-down-input__option-text']}>{el}</span>
            </li>
          ))
        ) : (
          <li className={cn(styles['drop-down-input__option'])}>
            <span className={styles['drop-down-input__option-text']}>Похоже ничего нет</span>
          </li>
        )}
      </ul>
    </div>
  );
}
