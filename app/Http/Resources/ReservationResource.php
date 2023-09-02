<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ReservationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'token' => $this->token,
            'activity' => $this->activity,
            'client' => $this->client,
            'price' => $this->price,
            'participants' => $this->participants,
            'status' => $this->status,
            'created_at' => (string) $this->created_at,
            'date' => $this->date,
            'notes' => $this->notes,
            'payment_method' => $this->payment_method
        ];
    }
}
