import requests
import time
import csv
import os
from dotenv import load_dotenv

load_dotenv()
SUBGRAPH_ENDPOINT = os.getenv('SUBGRAPH_ENDPOINT')
TARGET_RECEIVER = os.getenv('TARGET_RECEIVER').lower()


def get_streaming_periods(retro_timestamp):
    query = '''
    {
      streamPeriods (where:{receiver: ''' + '"' + TARGET_RECEIVER + '"' + ''', stoppedAtTimestamp:null, 
      startedAtTimestamp_lte:''' + str(retro_timestamp) + '''})
      {
        sender
        {
          id
        }
        token
        {
          symbol
        }
        flowRate
        startedAtTimestamp
        stream
        {
          flowUpdatedEvents
          {
            totalAmountStreamedUntilTimestamp
          }
        }
      }
    }
    '''
    r = requests.post(SUBGRAPH_ENDPOINT, json={'query': query})
    r_json = r.json()
    return r_json['data']


def get_address_amount_dict_by_symbol(data, symbol='MATICx'):
    address_amount_dict = dict()
    for stream_period in data['streamPeriods']:
        if stream_period['token']['symbol'] != symbol:
            continue
        # Calculate streaming amount
        timestamp_now = time.time()
        streaming_amount = (timestamp_now - int(stream_period['startedAtTimestamp'])) * int(stream_period['flowRate'])

        # Calculate streamed amount, triggered by update flow rate
        streamed_amount = 0
        for flow_updated_event in stream_period['stream']['flowUpdatedEvents']:
            streamed_amount += int(flow_updated_event['totalAmountStreamedUntilTimestamp'])

        address = stream_period['sender']['id']
        if address not in address_amount_dict:
            address_amount_dict[address] = streaming_amount + streamed_amount
        else:
            address_amount_dict[address] += streaming_amount + streamed_amount

    return address_amount_dict


def get_whitelist(address_amount_dict, threshold_amount):
    whitelist = []
    for address in address_amount_dict:
        readable_amount = address_amount_dict[address] / 1e18
        if readable_amount >= threshold_amount:
            whitelist.append(address)
    return whitelist


def save_whitelist_as_csv(whitelist, filename):
    with open(filename+".csv", "w") as f:
        writer = csv.writer(f, delimiter=',', lineterminator='\n')
        writer.writerow(whitelist)


def get_whitelist_with_conditions(retro_time_in_sec, threshold_amount, filename, symbol='MATICx'):
    retro_timestamp = int(time.time()) - retro_time_in_sec
    data = get_streaming_periods(retro_timestamp)
    address_amount_dict = get_address_amount_dict_by_symbol(data, symbol)
    whitelist = get_whitelist(address_amount_dict, threshold_amount)
    save_whitelist_as_csv(whitelist, filename)
