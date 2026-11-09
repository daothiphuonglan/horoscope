import React, { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes, useId, useState, useRef } from 'react';
import styles from './Input.module.css';

export enum InputType {
    Text = 'text',
    Number = 'number',
    Email = 'email',
    Password = 'password',
    Tel = 'tel',
    Url = 'url',
    Date = 'date',
    DateTimeLocal = 'datetime-local',
    Month = 'month',
    Week = 'week',
    Time = 'time',
    Radio = 'radio',
    Checkbox = 'checkbox',
    Textarea = 'textarea',
    Select = 'select',
    Color = 'color',
    File = 'file',
    Range = 'range',
}

export interface InputOption {
    label: string;
    value: string;
    disabled?: boolean;
}

export interface InputProps {
    label: string;
    errorMessage?: string;
    type?: InputType;
    id?: string;
    className?: string;
    placeholder?: string;
    disabled?: boolean;
    name?: string;
    value?: string | number;
    defaultValue?: string | number;
    required?: boolean;

    // Radio / Checkbox / Select options
    options?: InputOption[];

    // Textarea-specific
    rows?: number;

    // Range-specific
    min?: number;
    max?: number;
    step?: number;

    // File-specific
    accept?: string;
    multiple?: boolean;

    // Event handlers
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    onFocus?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

// ─── Text-like types ────────────────────────────────────
const TEXT_TYPES: InputType[] = [
    InputType.Text,
    InputType.Number,
    InputType.Email,
    InputType.Password,
    InputType.Tel,
    InputType.Url,
];

// ─── Date-like types ────────────────────────────────────
const DATE_TYPES: InputType[] = [
    InputType.Date,
    InputType.DateTimeLocal,
    InputType.Month,
    InputType.Week,
    InputType.Time,
];

const Input: React.FC<InputProps> = ({
    label,
    errorMessage,
    className,
    type = InputType.Text,
    id,
    options = [],
    rows = 4,
    min = 0,
    max = 100,
    step = 1,
    accept,
    multiple,
    value,
    onChange,
    ...props
}) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [rangeValue, setRangeValue] = useState<number>(
        typeof value === 'number' ? value : typeof props.defaultValue === 'number' ? props.defaultValue : Math.round((min + max) / 2)
    );
    const [dragActive, setDragActive] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [showPassword, setShowPassword] = useState(false);

    const inputClasses = [
        styles.input,
        errorMessage ? styles.hasError : '',
        className,
    ].filter(Boolean).join(' ');

    const containerClasses = [
        styles.container,
        errorMessage ? styles.containerError : '',
    ].filter(Boolean).join(' ');

    // ─── Render label ───────────────────────────────────
    const renderLabel = () => (
        <label htmlFor={inputId} className={styles.label}>
            {label}
            {props.required && <span className={styles.required}>*</span>}
        </label>
    );

    // ─── Render error ───────────────────────────────────
    const renderError = () =>
        errorMessage ? <span className={styles.errorMessage}>{errorMessage}</span> : null;

    // ═══════════════════════════════════════════════════════
    //  TEXT / NUMBER / EMAIL / TEL / URL
    // ═══════════════════════════════════════════════════════
    if (TEXT_TYPES.includes(type) && type !== InputType.Password) {
        return (
            <div className={containerClasses}>
                {renderLabel()}
                <div className={styles.inputWrapper}>
                    {type === InputType.Email && (
                        <span className={styles.inputIcon}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                        </span>
                    )}
                    {type === InputType.Tel && (
                        <span className={styles.inputIcon}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                        </span>
                    )}
                    {type === InputType.Url && (
                        <span className={styles.inputIcon}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
                        </span>
                    )}
                    <input
                        id={inputId}
                        type={type}
                        className={`${inputClasses} ${(type === InputType.Email || type === InputType.Tel || type === InputType.Url) ? styles.inputWithIcon : ''}`}
                        value={value}
                        onChange={onChange}
                        {...props}
                    />
                </div>
                {renderError()}
            </div>
        );
    }

    // ═══════════════════════════════════════════════════════
    //  PASSWORD (with show/hide toggle)
    // ═══════════════════════════════════════════════════════
    if (type === InputType.Password) {
        return (
            <div className={containerClasses}>
                {renderLabel()}
                <div className={styles.inputWrapper}>
                    <span className={styles.inputIcon}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                    </span>
                    <input
                        id={inputId}
                        type={showPassword ? 'text' : 'password'}
                        className={`${inputClasses} ${styles.inputWithIcon} ${styles.inputWithToggle}`}
                        value={value}
                        onChange={onChange}
                        {...props}
                    />
                    <button
                        type="button"
                        className={styles.passwordToggle}
                        onClick={() => setShowPassword(!showPassword)}
                        tabIndex={-1}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                        {showPassword ? (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                        ) : (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                        )}
                    </button>
                </div>
                {renderError()}
            </div>
        );
    }

    // ═══════════════════════════════════════════════════════
    //  DATE / DATETIME-LOCAL / MONTH / WEEK / TIME
    // ═══════════════════════════════════════════════════════
    if (DATE_TYPES.includes(type)) {
        return (
            <div className={containerClasses}>
                {renderLabel()}
                <div className={styles.inputWrapper}>
                    <span className={styles.inputIcon}>
                        {type === InputType.Time ? (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                        ) : (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                        )}
                    </span>
                    <input
                        id={inputId}
                        type={type}
                        className={`${inputClasses} ${styles.inputWithIcon} ${styles.dateInput}`}
                        value={value}
                        onChange={onChange}
                        {...props}
                    />
                </div>
                {renderError()}
            </div>
        );
    }

    // ═══════════════════════════════════════════════════════
    //  RADIO
    // ═══════════════════════════════════════════════════════
    if (type === InputType.Radio) {
        return (
            <div className={containerClasses}>
                <span className={styles.label}>{label}{props.required && <span className={styles.required}>*</span>}</span>
                <div className={styles.radioGroup}>
                    {options.map((option, index) => {
                        const optionId = `${inputId}-radio-${index}`;
                        const isChecked = value !== undefined ? String(value) === option.value : false;
                        return (
                            <label
                                key={option.value}
                                htmlFor={optionId}
                                className={`${styles.radioLabel} ${isChecked ? styles.radioLabelChecked : ''} ${option.disabled ? styles.radioLabelDisabled : ''}`}
                            >
                                <input
                                    id={optionId}
                                    type="radio"
                                    name={props.name || inputId}
                                    value={option.value}
                                    {...(onChange
                                        ? { checked: isChecked, onChange }
                                        : { defaultChecked: isChecked }
                                    )}
                                    disabled={option.disabled || props.disabled}
                                    className={styles.radioInput}
                                />
                                <span className={styles.radioCustom}>
                                    <span className={styles.radioDot} />
                                </span>
                                <span className={styles.radioText}>{option.label}</span>
                            </label>
                        );
                    })}
                </div>
                {renderError()}
            </div>
        );
    }

    // ═══════════════════════════════════════════════════════
    //  CHECKBOX
    // ═══════════════════════════════════════════════════════
    if (type === InputType.Checkbox) {
        // Single checkbox (no options) or multiple checkboxes
        if (options.length === 0) {
            return (
                <div className={containerClasses}>
                    <label htmlFor={inputId} className={styles.checkboxSingle}>
                        <input
                            id={inputId}
                            type="checkbox"
                            className={styles.checkboxInput}
                            {...(onChange
                                ? { checked: value === 'true' || value === (true as unknown as string), onChange }
                                : { defaultChecked: value === 'true' || value === (true as unknown as string) }
                            )}
                            disabled={props.disabled}
                        />
                        <span className={styles.checkboxCustom}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                        </span>
                        <span className={styles.checkboxText}>{label}</span>
                    </label>
                    {renderError()}
                </div>
            );
        }

        return (
            <div className={containerClasses}>
                <span className={styles.label}>{label}{props.required && <span className={styles.required}>*</span>}</span>
                <div className={styles.checkboxGroup}>
                    {options.map((option, index) => {
                        const optionId = `${inputId}-checkbox-${index}`;
                        return (
                            <label
                                key={option.value}
                                htmlFor={optionId}
                                className={`${styles.checkboxLabel} ${option.disabled ? styles.checkboxLabelDisabled : ''}`}
                            >
                                <input
                                    id={optionId}
                                    type="checkbox"
                                    name={props.name || inputId}
                                    value={option.value}
                                    disabled={option.disabled || props.disabled}
                                    onChange={onChange}
                                    className={styles.checkboxInput}
                                />
                                <span className={styles.checkboxCustom}>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                </span>
                                <span className={styles.checkboxText}>{option.label}</span>
                            </label>
                        );
                    })}
                </div>
                {renderError()}
            </div>
        );
    }

    // ═══════════════════════════════════════════════════════
    //  TEXTAREA
    // ═══════════════════════════════════════════════════════
    if (type === InputType.Textarea) {
        const textareaClasses = [
            styles.textarea,
            errorMessage ? styles.hasError : '',
            className,
        ].filter(Boolean).join(' ');

        return (
            <div className={containerClasses}>
                {renderLabel()}
                <textarea
                    id={inputId}
                    className={textareaClasses}
                    rows={rows}
                    value={value}
                    onChange={onChange as React.ChangeEventHandler<HTMLTextAreaElement>}
                    placeholder={props.placeholder}
                    disabled={props.disabled}
                />
                {renderError()}
            </div>
        );
    }

    // ═══════════════════════════════════════════════════════
    //  SELECT (Dropdown)
    // ═══════════════════════════════════════════════════════
    if (type === InputType.Select) {
        const selectClasses = [
            styles.select,
            errorMessage ? styles.hasError : '',
            className,
        ].filter(Boolean).join(' ');

        return (
            <div className={containerClasses}>
                {renderLabel()}
                <div className={styles.selectWrapper}>
                    <select
                        id={inputId}
                        className={selectClasses}
                        value={value}
                        onChange={onChange as React.ChangeEventHandler<HTMLSelectElement>}
                        disabled={props.disabled}
                    >
                        {props.placeholder && (
                            <option value="" disabled>
                                {props.placeholder}
                            </option>
                        )}
                        {options.map((option) => (
                            <option key={option.value} value={option.value} disabled={option.disabled}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <span className={styles.selectArrow}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                    </span>
                </div>
                {renderError()}
            </div>
        );
    }

    // ═══════════════════════════════════════════════════════
    //  COLOR PICKER
    // ═══════════════════════════════════════════════════════
    if (type === InputType.Color) {
        const displayValue = typeof value === 'string' ? value : '#3b82f6';

        return (
            <div className={containerClasses}>
                {renderLabel()}
                <div className={styles.colorWrapper}>
                    <input
                        id={inputId}
                        type="color"
                        className={styles.colorInput}
                        value={displayValue}
                        onChange={onChange}
                        disabled={props.disabled}
                    />
                    <span
                        className={styles.colorPreview}
                        style={{ backgroundColor: displayValue }}
                    />
                    <span className={styles.colorValue}>{displayValue.toUpperCase()}</span>
                </div>
                {renderError()}
            </div>
        );
    }

    // ═══════════════════════════════════════════════════════
    //  FILE UPLOAD
    // ═══════════════════════════════════════════════════════
    if (type === InputType.File) {
        const handleDrag = (e: React.DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            if (e.type === 'dragenter' || e.type === 'dragover') {
                setDragActive(true);
            } else if (e.type === 'dragleave') {
                setDragActive(false);
            }
        };

        const handleDrop = (e: React.DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(false);
            if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                setSelectedFiles(Array.from(e.dataTransfer.files));
            }
        };

        const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files.length > 0) {
                setSelectedFiles(Array.from(e.target.files));
            }
            onChange?.(e);
        };

        return (
            <div className={containerClasses}>
                {renderLabel()}
                <div
                    className={`${styles.fileDropZone} ${dragActive ? styles.fileDropZoneActive : ''} ${props.disabled ? styles.fileDropZoneDisabled : ''}`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => !props.disabled && fileInputRef.current?.click()}
                >
                    <input
                        ref={fileInputRef}
                        id={inputId}
                        type="file"
                        className={styles.fileInput}
                        accept={accept}
                        multiple={multiple}
                        onChange={handleFileChange}
                        disabled={props.disabled}
                    />
                    <div className={styles.fileContent}>
                        <div className={styles.fileIcon}>
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
                        </div>
                        <p className={styles.fileText}>
                            <span className={styles.fileBrowse}>Click to browse</span> or drag & drop
                        </p>
                        {accept && (
                            <p className={styles.fileHint}>{accept}</p>
                        )}
                    </div>
                </div>
                {selectedFiles.length > 0 && (
                    <div className={styles.fileList}>
                        {selectedFiles.map((file, i) => (
                            <div key={i} className={styles.fileItem}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /><polyline points="13 2 13 9 20 9" /></svg>
                                <span className={styles.fileName}>{file.name}</span>
                                <span className={styles.fileSize}>{(file.size / 1024).toFixed(1)} KB</span>
                            </div>
                        ))}
                    </div>
                )}
                {renderError()}
            </div>
        );
    }

    // ═══════════════════════════════════════════════════════
    //  RANGE SLIDER
    // ═══════════════════════════════════════════════════════
    if (type === InputType.Range) {
        const percentage = ((rangeValue - min) / (max - min)) * 100;

        const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setRangeValue(Number(e.target.value));
            onChange?.(e);
        };

        return (
            <div className={containerClasses}>
                {renderLabel()}
                <div className={styles.rangeWrapper}>
                    <div className={styles.rangeTrack}>
                        <div
                            className={styles.rangeFill}
                            style={{ width: `${percentage}%` }}
                        />
                        <input
                            id={inputId}
                            type="range"
                            min={min}
                            max={max}
                            step={step}
                            value={rangeValue}
                            onChange={handleRangeChange}
                            className={styles.rangeInput}
                            disabled={props.disabled}
                        />
                    </div>
                    <div className={styles.rangeInfo}>
                        <span className={styles.rangeMin}>{min}</span>
                        <span className={styles.rangeValue}>{rangeValue}</span>
                        <span className={styles.rangeMax}>{max}</span>
                    </div>
                </div>
                {renderError()}
            </div>
        );
    }

    // ═══════════════════════════════════════════════════════
    //  FALLBACK (default text input)
    // ═══════════════════════════════════════════════════════
    return (
        <div className={containerClasses}>
            {renderLabel()}
            <input
                id={inputId}
                type={type}
                className={inputClasses}
                value={value}
                onChange={onChange}
                {...props}
            />
            {renderError()}
        </div>
    );
};

export default Input;