import snapshot

if __name__ == '__main__':
    # Started streaming more than 1 minute ago.
    retro_time_in_sec = 1 * 60
    threshold_amount = 0.0001
    filename = 'whitelist1'
    symbol = 'MATICx'
    snapshot.get_whitelist_with_conditions(retro_time_in_sec, threshold_amount, filename, symbol)

