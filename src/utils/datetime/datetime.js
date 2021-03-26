'use strict';

const Joi = require('joi');
const faker = require('faker');
const convert = require('joi-to-json');


const moment = require('moment-timezone');


const TIMEZONE_COUNTRY = 'US';
const EASTERN = 'America/New_York';    //EST, -0500, EDT -0400
const CENTRAL = 'America/Chicago';     //CST
const MOUNTAIN = 'America/Denver';     //MST
const PACIFIC = 'America/Los_Angeles'; //PST
const ALASKA = 'America/Anchorage';    //AKST
const HAWAII = 'Pacific/Honolulu';     //HST

//parse and format
const BUSINESS_DATE = 'MM/DD/YYYY';
const BUSINESS_TIME = 'hh:mm A';
const BUSINESS_DATETIME = 'MM/DD/YYYY hh:mm A';
const US_ZONES = [EASTERN,CENTRAL,MOUNTAIN,PACIFIC,ALASKA,HAWAII];


const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
const timeRegex = /\b((1[0-2]|0?[1-9]):([0-5][0-9]) ([AaPp][Mm]))/;

const _schema = Joi.object({
  date: Joi.string().regex(dateRegex).required(),
  time: Joi.string().regex(timeRegex).required(),
  timezone: Joi.string().valid(...US_ZONES).required(),
  utc: Joi.date().iso().required()
});

const schema = Joi.date().iso().required();

const _ = (date, time) => `${date} ${time}`;
const _createUtc = (date, time, timezone) => moment(_(date, time), BUSINESS_DATETIME).tz(timezone).utc().format();
const _dateValid = date => moment(date, BUSINESS_DATE).isValid();
const _timeValid = time => moment(time, 'LT').isValid();
const _usTimezoneValid = timezone => US_ZONES.includes(timezone);

const DateTime = (date = '', time = '', timezone = EASTERN, utc = '') => {
    let value = {
      date,
      time,
      timezone,
      utc
    };
    let error;
    const details = [];

    try {
      if(!utc.length) {
        if(!_dateValid(date)) {
          details.push(`${date} is invalid format, expect ${BUSINESS_DATE} format with valid values for date`);
        }
        if(!_timeValid(time)) {
          details.push(`${time} is invalid format, expect ${BUSINESS_TIME} format with valid values for time`);
        }
        if(!_usTimezoneValid(timezone)){
          details.push(`${timezone} is invalid, expect one of ${US_ZONES.join(', ')}`);
        }
        if(details.length) {
          return Object.freeze({
            error: {details},
            value
          });
        }
        value.utc = _createUtc(date, time, timezone);
      } else {
        value.date = businessDateFromUtc(utc, timezone);
        value.time = businessTimeFromUtc(utc, timezone);
        value.timezone = timezone;
      }
       return Object.freeze({error,value});
    }catch(err) {
      return Object.freeze({
        error: {details: [err]},
        value
      })
    }
};

// expects '2021-02-02T18:20:00Z' and provides 02/02/2021 for given timezone for example.
const businessDateFromUtc = (utcStr, timeZone = EASTERN) => {
  return moment.utc(utcStr).tz(timeZone).format(BUSINESS_DATE);
};

const businessTimeFromUtc = (utcStr, timeZone = EASTERN) => {
  return moment.utc(utcStr).tz(timeZone).format(BUSINESS_TIME);
};

const labels = () => {
  return {
    date: 'Date',
    time: 'Time',
    timezone: 'Time Zone',
    utc: 'Time Stamp'
  }
};

const generateRandom = () => {
  return faker.date.recent().toISOString();
};

const jsonSchema = () => {
  return convert(_schema);
};

const validate = (datetimeInfo) => {
  const result = _schema.validate(datetimeInfo);
  return Object.freeze(result);
}

module.exports = {
  schema,
  DateTime,
  generateRandom,
  labels,
  jsonSchema,
  validate,
  US_ZONES
};
