import { table, getMinifyRecord } from './utils/Airtable';
import auth0 from './utils/auth0';

export default auth0.requireAuthentication(async (req, res) => {
  const { id } = req.body;
  const { user } = await auth0.getSession(req);

  try{
    const deletedRecords = await table.destroy([id]);
    res.statusCode = 200
    res.json(getMinifyRecord(deletedRecords[0]));
  }catch(err){
    console.error(err);
    res.statusCode = 500
    res.json({ msg: 'Something went wrong' });
  }
});