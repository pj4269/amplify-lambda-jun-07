import json

def handler(event, context):
    print("Heeelllllllo:  ", event )
    customerId = event['pathParameters']['customerId']  # API: /customers/123 => 123 becomes customerId
    customer = {'customerId': customerId, 'customerName': "Customer " + customerId}

    print ( "Hiiiiiiiiii:  ", customerId , type(customerId), int(customerId) + 1111  )

    response = {
        'statusCode': 200,
        # Uncomment below to enable CORS requests
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*'
        },
        'body': json.dumps(customer)
    }
    return response
    
