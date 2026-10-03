import { type State, type Entry, today } from './model.ts';
export type SnapshotCard={kind:string;label:string;value:string;context:string;sample:boolean};
export function dailySnapshot(state:State,date=today()):SnapshotCard[]{
 const current=state.entries.filter(e=>e.date===date);
 const previous=state.entries.filter(e=>e.date<date&&e.date>=new Date(new Date(date+'T12:00:00').getTime()-7*86400000).toLocaleDateString('en-CA'));
 const baseline=(kind:string,get:(e:Entry)=>number|undefined,sum=false)=>{const groups=new Map<string,number>();for(const e of previous.filter(e=>e.kind===kind)){const n=get(e);if(n!==undefined&&Number.isFinite(n))groups.set(e.date,sum?(groups.get(e.date)||0)+n:n)}return groups.size>=3?[...groups.values()].reduce((a,b)=>a+b,0)/groups.size:null};
 const comparison=(value:number,usual:number|null,unit:string,multiplier=1)=>{if(usual===null)return 'Your usual will emerge with more logged days';const difference=Math.round(Math.abs(value-usual)*multiplier/5)*5;return difference<5?'Close to your recent usual':`${difference}${unit} ${value>usual?'above':'below'} your usual`};
 const card=(kind:string):SnapshotCard=>{
  const es=current.filter(e=>e.kind===kind),last=es.at(-1);let value='Not logged yet',context='Add a little context when it’s useful';
  if(kind==='Food'&&es.length){value=`${es.length} ${es.length===1?'meal':'meals'} logged`;const home=es.filter(e=>(e.preparation||e.detail).toLowerCase().includes('home-cooked')).length,outside=es.filter(e=>e.preparation==='Restaurant').length;context=[home?`${home} home-cooked`:'',outside?`${outside} outside`:'',es.length-home-outside?`${es.length-home-outside} preparation not specified`:''].filter(Boolean).join(' · ')}
  if(kind==='Activity'&&es.some(e=>e.minutes!==undefined)){const n=es.reduce((a,e)=>a+(e.minutes||0),0);value=`${n} active min`;context=comparison(n,baseline(kind,e=>e.minutes,true),' min')}
  if(kind==='Sleep'&&last?.hours!==undefined){const mins=Math.round(last.hours*60);value=`${Math.floor(mins/60)}h ${mins%60}m`;context=comparison(last.hours,baseline(kind,e=>e.hours),'m',60)}
  if(['Hunger','Energy','Cravings'].includes(kind)&&last?.score!==undefined){value=`${last.score} / 5`;context='Your latest check-in today'}
  if(kind==='Post-meal walks'){const walks=current.filter(e=>e.kind==='Activity'&&/after dinner|post.meal/i.test(e.detail)&&e.minutes!==undefined);if(walks.length){const count=walks.filter(e=>e.minutes!>0).length;value=`${count} ${count===1?'walk':'walks'} logged`;context=`${walks.reduce((a,e)=>a+(e.minutes||0),0)} min after meals`}return{kind:'Activity',label:kind,value,context,sample:walks.some(e=>e.sample)}}
  if(kind==='Weight'){const weights=state.entries.filter(e=>e.kind==='Weight'&&e.date<=date&&/^\d+(\.\d+)? kg$/.test(e.value)).sort((a,b)=>a.date.localeCompare(b.date)),latest=weights.at(-1);if(latest){value=latest.value;const week=[...new Map(weights.filter(e=>e.date>=new Date(new Date(date+'T12:00:00').getTime()-6*86400000).toLocaleDateString('en-CA')).map(e=>[e.date,e])).values()];const ns=week.map(e=>parseFloat(e.value));context=week.length>=3?`${Math.min(...ns).toFixed(1)}–${Math.max(...ns).toFixed(1)} kg · ${week.length} logs this week`:`Last logged ${latest.date===date?'today':latest.date}`;return{kind,label:kind,value,context,sample:latest.sample||false}}context='Optional · one point in a longer picture'}
  return{kind,label:kind==='Activity'?'Movement':kind,value,context,sample:es.some(e=>e.sample)};
 };
 const id=state.active?.id;
 const kinds=id==='sleep'?['Sleep','Cravings','Energy','Activity']:['walk','exercise','sitting','timing'].includes(id||'')?['Food','Activity','Post-meal walks','Sleep']:['protein','portion','structure','drink','strength'].includes(id||'')?['Food','Hunger','Energy','Sleep']:['Food','Activity','Sleep','Weight'];
 return kinds.map(card);
}
export function migrateHome(state:State):State{
 if(state.homeRevision===1)return state;
 if(!state.demo)return{...state,homeRevision:1};
 const entries=homeDemoEntries().filter(e=>!state.entries.some(existing=>!existing.sample&&existing.date===e.date&&existing.kind===e.kind));
 return{...state,homeRevision:1,entries:[...state.entries,...entries]};
}
export function homeDemoEntries():Entry[]{
 const date=today();return [
 ...['Idli + sambar','Rajma + rice','2 rotis + dal + sabzi + curd'].map((food,i)=>({id:`home-demo-food-${date}-${i}`,date,kind:'Food',value:food,food,detail:['Breakfast','Lunch','Dinner'][i]+' · 1 plate',mealTime:['08:30','13:00','19:30'][i],preparation:i===1?'Restaurant':'Home-cooked',sample:true})),
 {id:`home-demo-sleep-${date}`,date,kind:'Sleep',value:'6.7 hours of sleep',hours:6.7,detail:'Self-reported',sample:true},
 {id:`home-demo-walk-${date}`,date,kind:'Activity',value:'15 min walk',minutes:15,detail:'After dinner',sample:true},
 {id:`home-demo-movement-${date}`,date,kind:'Activity',value:'17 min walking',minutes:17,detail:'Afternoon errands',sample:true},
 {id:`home-demo-energy-${date}`,date,kind:'Energy',value:'Energy 4/5',score:4,detail:'Evening check-in',sample:true},
 {id:`home-demo-hunger-${date}`,date,kind:'Hunger',value:'Hunger 2/5',score:2,detail:'Two hours after breakfast',sample:true},
 {id:`home-demo-weight-${date}`,date,kind:'Weight',value:'72.2 kg',detail:'Self-reported',sample:true}];
}
