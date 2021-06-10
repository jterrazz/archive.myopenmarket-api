import { EmailMessage } from '~/models/messages/emails/email.message';

type RegistrationEmailMessageType = {
  email: string;
  templateValues: {
    user: {
      name: string;
    };
  };
};

export class RegistrationEmailMessage extends EmailMessage {
  static identifier = 'registration-email:1';
  data: RegistrationEmailMessageType;

  constructor(message: RegistrationEmailMessageType) {
    super(message);
  }
}
