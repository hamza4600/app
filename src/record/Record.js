import RecordCard from './RecordCard';
import RecordList from './RecordList';
import RecordSort from './RecordSort';
import RecordTools from './RecordTools';
import { getRecord } from './helpers/getRecord';
import { listRecords } from './helpers/listRecords';
import { getParentRecord } from './helpers/getParentRecord';

const Record = {
  List: getParentRecord(listRecords(RecordList)),
  Add:  RecordCard,
  View: getRecord(RecordCard),
  Edit: getRecord(RecordCard),
  Sort: listRecords(RecordSort),
  Tools: RecordTools
}

export default Record;
