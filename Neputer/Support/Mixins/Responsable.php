<?php

namespace Neputer\Support\Mixins;

use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use \Neputer\Support\Lib\Response as ResponseLib;

trait Responsable
{

    /**
     * @param $body
     * @param $message
     * @param $messageCode
     * @param $status
     * @return JsonResponse
     */
    public function systemResponse($body, $message, $messageCode, $status)
    {
        return response()->json([
            'body' => $body,
            'status' => [
                'message' => $message,
                'messageCode' => $messageCode,
                'status' => $status
            ],
        ]);
    }

    /**
     * @param null $body
     * @param string $message
     * @param string $messageCode
     * @param int $status
     * @return JsonResponse
     */
    public function responseOk(
        $body = null,
        $message = ResponseLib::RESPONSE_OK,
        $messageCode = 'OK',
        $status = Response::HTTP_OK
    )
    {
        return $this->systemResponse(
            $body,
            $message,
            $messageCode,
            $status
        );
    }

    /**
     * @param null $body
     * @param string $message
     * @param string $messageCode
     * @param int $status
     * @return JsonResponse
     */
    public function responseError(
        $body = null,
        $message = ResponseLib::RESPONSE_ERROR,
        $messageCode = 'error',
        $status = Response::HTTP_INTERNAL_SERVER_ERROR
    )
    {
        return $this->systemResponse(
            $body,
            $message,
            $messageCode,
            $status);
    }

}
