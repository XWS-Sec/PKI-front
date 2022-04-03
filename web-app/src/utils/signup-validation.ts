import { EmailRegexError } from '../errors/email-regex-error';
import { EmailTakenError } from '../errors/email-taken-error';
import { FirstNameRegexError } from '../errors/first-name-regex-error';
import { LastNameRegexError } from '../errors/last-name-regex-error';
import { PasswordShortError } from '../errors/password-short-error';
import { PasswordsDontMatchError } from '../errors/passwords-dont-match-error';
import { PhoneNumberRegexError } from '../errors/phone-number-regex-error';
import { UserImmatureError } from '../errors/user-immature-error';
import { UsernameRegexError } from '../errors/username-regex-error';
import { UsernameTakenError } from '../errors/username-taken-error';
import { sleep } from '../utils/sleep';

const USERNAME_CHECK_TIMEOUT = 1500;
const MIN_USER_AGE = 12;
const MIN_PASSWORD_LENGTH = 8;

export default class SignupValidation {
  private isEmailTakenLastRequestMoment: number = Date.now();
  private isUsernameTakenLastRequestMoment: number = Date.now();
  private emailRegex: RegExp = new RegExp(
    // eslint-disable-next-line
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );
  private usernameRegex: RegExp = new RegExp(/^[a-zA-Z0-9._]+$/);
  private noSpecialCharsOrNumbersRegex: RegExp = new RegExp(
    // eslint-disable-next-line
    /^[^`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~0123456789]+$/
  );
  private phoneNumberRegex: RegExp = new RegExp(/^[0-9]+$/);

  public validateEmail = async (value: string) => {
    if (!this.isEmailRegexValid(value)) {
      throw new EmailRegexError();
    }

    const isTaken = await this.isEmailTakenDebounced(value);

    if (isTaken) {
      throw new EmailTakenError();
    }
  };

  private isEmailRegexValid = (value: string) => {
    return this.emailRegex.test(value);
  };

  private isEmailTaken = async (username: string): Promise<boolean> => {
    var answer = false;

    //TODO: send check request

    return answer;
  };

  private isEmailTakenDebounced = async (value: string): Promise<boolean> => {
    this.isEmailTakenLastRequestMoment = Date.now();
    await sleep(USERNAME_CHECK_TIMEOUT);

    if (
      Date.now() <
      this.isEmailTakenLastRequestMoment + USERNAME_CHECK_TIMEOUT
    ) {
      return false; // cancel check
    }

    return this.isEmailTaken(value);
  };

  public validateUsername = async (value: string) => {
    if (!this.isUsernameRegexValid(value)) {
      throw new UsernameRegexError();
    }

    this.isUsernameTakenDebounced(value).then((isTaken) => {
      if (isTaken) {
        throw new UsernameTakenError();
      }
    });
  };

  private isUsernameRegexValid = (value: string) => {
    return this.usernameRegex.test(value);
  };

  private isUsernameTaken = async (username: string): Promise<boolean> => {
    var answer = false;

    //TODO: send check request

    return answer;
  };

  private isUsernameTakenDebounced = async (
    value: string
  ): Promise<boolean> => {
    this.isUsernameTakenLastRequestMoment = Date.now();
    await sleep(USERNAME_CHECK_TIMEOUT);

    if (
      Date.now() <
      this.isUsernameTakenLastRequestMoment + USERNAME_CHECK_TIMEOUT
    ) {
      return false; // cancel check
    }

    return this.isUsernameTaken(value);
  };

  public validateFirstName = (value: string) => {
    if (!this.isFirstNameRegexValid(value)) {
      throw new FirstNameRegexError();
    }
  };

  private isFirstNameRegexValid = (value: string) => {
    return this.noSpecialCharsOrNumbersRegex.test(value);
  };

  public validateLastName = (value: string) => {
    if (!this.isLastNameRegexValid(value)) {
      throw new LastNameRegexError();
    }
  };

  private isLastNameRegexValid = (value: string) => {
    return this.noSpecialCharsOrNumbersRegex.test(value);
  };

  public validateDateOfBirth = (value: string) => {
    if (!this.isAtLeastTwelve(value)) {
      throw new UserImmatureError();
    }
  };

  public validatePhoneNumber = (value: string) => {
    if (!this.isPhoneNumberRegexValid(value)) {
      throw new PhoneNumberRegexError();
    }
  };

  private isPhoneNumberRegexValid = (value: string) => {
    return this.phoneNumberRegex.test(value);
  };

  private isAtLeastTwelve = (value: string) => {
    const currentYear = new Date().getFullYear();
    const yearOfBirth = new Date(Date.parse(value)).getFullYear();
    return currentYear - yearOfBirth >= MIN_USER_AGE;
  };

  public validatePassword = (value: string) => {
    if (!this.isPasswordLengthValid(value)) {
      throw new PasswordShortError();
    }
  };

  private isPasswordLengthValid = (value: string) => {
    return value.length >= MIN_PASSWORD_LENGTH;
  };

  public validateConfirmPassword = (value: string, password: string) => {
    if (!this.doPasswordsMatch(value, password)) {
      throw new PasswordsDontMatchError();
    }
  };

  private doPasswordsMatch = (value: string, password: string) => {
    return value === password;
  };
}
