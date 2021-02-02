import template from './template.marko';
import {photos} from '../../../photos';

export default async function ({params}, res) {
  const {id} = params;
  const photo = photos.find (photo => photo.id === id);

  // template.stream ({photo}).pipe (res);

  res.marko (template, {photo});

  //   setTimeout (() => {
  //   }, 3000);
}
