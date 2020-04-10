import { ServiceSchema } from 'moleculer';
import mongodbMixin from '../../mixins/mongodb.mixin';

const serviceSchema: ServiceSchema = {
  name: 'documents-store',
  version: '1.0.0',
  settings: {
    $noVersionPrefix: false,
  },
  mixins: [mongodbMixin('documents')],
};

export = serviceSchema;
