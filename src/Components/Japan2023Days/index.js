import June4  from './June4';
import June17 from './June17';

/* Registry of custom day breakdowns.
   Key = trip date string (YYYY-MM-DD), value = component.
   Add a new entry here whenever a day gets its own custom view. */
const JAPAN_DAY_COMPONENTS = {
  '2023-06-04': June4,
  '2023-06-17': June17,
};

export default JAPAN_DAY_COMPONENTS;
