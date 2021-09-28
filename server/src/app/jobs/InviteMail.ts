import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Mail from '../../lib/Mail';

class InviteMail {
  get key() {
    return 'InviteMail';
  }

  async handle({ data }: any) {
    const { user, event } = data;
    await Mail.sendMail({
      to: `${user.name} <${user.email}>`,
      subject: 'Você recebeu um novo convite',
      template: 'invitation',
      context: {
        name: user.name,
        date: format(parseISO(event.start_date), "dd 'de' MMMM', às' H:mm'h'", {
          locale: pt,
        }),
        description: event.description,
      },
    });
  }
}

export default new InviteMail();
