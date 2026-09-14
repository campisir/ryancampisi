import May31  from './May31';
import June1  from './June1';
import June2  from './June2';
import June3  from './June3';
import June4  from './June4';
import June5  from './June5';
import June17 from './June17';

/* Registry of custom day breakdowns.
   Key = trip date string (YYYY-MM-DD), value = component.
   Add a new entry here whenever a day gets its own custom view. */
const JAPAN_DAY_COMPONENTS = {
  '2023-05-31': May31,
  '2023-06-01': June1,
  '2023-06-02': June2,
  '2023-06-03': June3,
  '2023-06-04': June4,
  '2023-06-05': June5,
  '2023-06-17': June17,
};

export default JAPAN_DAY_COMPONENTS;
